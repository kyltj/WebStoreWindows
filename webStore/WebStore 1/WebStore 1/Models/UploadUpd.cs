using ICSharpCode.SharpZipLib.Zip;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Xml.Linq;
using System.Xml.Schema;

namespace WebStore_1.Models
{
    public class UploadUpd
    {
        //название к пакету
        public string Path { get; set; }
        //Путь к пакету
        public string Root { get; set; }
        //проверяет если настройки
        public bool Setting { get; set; }
        //модель приложения
        public Update Upd { get; set; }
        //читает zip из памяти
        public ZipInputStream Zip { get; set; }
        //читает файл из памяти
        public FileStream Filestream { get; set; }
        //item zip файла
        public ZipEntry Item { get; set; }
        //создает обьект zip архива
        public ZipFile Zipfile { get; set; }
        // создает провайдера
        public MultipartMemoryStreamProvider Provider { get; set; }

        public void GetProvider()
        {
            Provider = new MultipartMemoryStreamProvider();
            // путь к папке на сервере
            Root = System.Web.HttpContext.Current.Server.MapPath("~/Updates/");
        }

        //считывает zip отпрвленный клиентом

        public async System.Threading.Tasks.Task ReadFileAsync()
        {

            foreach (var file in Provider.Contents)
            {
                Path = Guid.NewGuid().ToString() + ".zip";

                byte[] fileArray = await file.ReadAsByteArrayAsync();

                using (FileStream fs = new FileStream(Root + Path, FileMode.Create))
                {
                    await fs.WriteAsync(fileArray, 0, fileArray.Length);
                    fs.Close();
                }
            }
        }



        public async System.Threading.Tasks.Task<List<Error>> ValidateAsync(int idapp)
        {
            try
            {
                List<Error> listErrors = new List<Error>();
                ApplicationDbContext db = new ApplicationDbContext();

                Zip = new ZipInputStream(File.OpenRead(Root + Path));
                Filestream = new FileStream(Root + Path, FileMode.Open, FileAccess.Read);


                Zipfile = new ZipFile(Filestream);


                while ((Item = Zip.GetNextEntry()) != null)
                {
                    if (Item.Name == "manifest.xml")
                    {
                        Setting = true;

                        StreamReader s = new StreamReader(Zipfile.GetInputStream(Item));

                        XDocument xdoc = XDocument.Parse(await s.ReadToEndAsync());

                        //Validate Manifest xml

                        XmlSchemaSet schemaSet = new XmlSchemaSet();
                        schemaSet.Add(null,Root + "Update.xsd");
                        try
                        {
                            xdoc.Validate(schemaSet, null);

                        }
                        catch (XmlSchemaValidationException ex)
                        {
                            listErrors.Add(new Error() { Name = "ValidManifest", Text = ex.Message });
                        }

                        Filestream.Close();
                        s.Close();

                        // ReSharper disable once PossibleNullReferenceException
                        foreach (XElement appElement in xdoc.Element("settings")?.Elements("Upd"))
                        {
                            Upd.Name = appElement.Attribute("name")?.Value;
                            if (Upd.Name == "") listErrors.Add(new Error() { Name = "Name", Text = "В файле настроек нет атрибута Name" });


                            Upd.Version = appElement.Element("version")?.Value;
                            if (Upd.Version == "") listErrors.Add(new Error() { Name = "NameUser", Text = "В файле настроек нет атрибута NameUser" });


                            Upd.Description = appElement.Element("Description")?.Value;
                            if (Upd.Description == "") listErrors.Add(new Error() { Name = "Description", Text = "В файле настроек нет атрибута Description" });


                            if (db.Updates.Count(p => p.Version == Upd.Version && p.ApplicationId == idapp) > 1)
                            {

                                listErrors.Add(new Error() { Name = "Using", Text = "Обновление с такой версией уже существует" });
                            }
                        }
                    }
                }

                if (Setting == false)
                {
                    listErrors.Add(new Error() { Name = "setting", Text = "Не обнаружено файла с настройками" });
                }
                Zip.Close();
                Zipfile.Close();
                return listErrors;
            }

            catch (Exception)
            {
                List<Error> listErrors = new List<Error>
                {
                    new Error() {Name = "ValidateUpd", Text = "Неизвестая Ошибка Валидации"}
                };
                return listErrors;
            }
        }
    }
}