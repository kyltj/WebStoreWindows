using ICSharpCode.SharpZipLib.Zip;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Xml.Linq;
using System.Xml.Schema;

namespace WebStore_1.Models
{
    public class UploadApp
    {
        //название  пакета
        public string Path { get; set; }
        //название  иконки
        public string PathIcon { get; set; }
        //Путь к пакету
        public string Root { get; set; }
        //Путь к иконке по умолчанию
        public string IconDefaultPath { get; set; }
        //проверяет есть ли настройки
        public bool Setting { get; set; }
        //проверяет есть ли иконка
        public bool Icon { get; set; }
        //Байтовый массив для иконки
        public StreamReader ImageData { get; set; }
        //модель приложения
        public Application App { get; set; }
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

        public static long GetFileSizeOnDisk(string file)
        {
            FileInfo info = new FileInfo(file);
            uint dummy, sectorsPerCluster, bytesPerSector;
            int result = GetDiskFreeSpaceW(info.Directory.Root.FullName, out sectorsPerCluster, out bytesPerSector, out dummy, out dummy);
            if (result == 0) throw new Win32Exception();
            uint clusterSize = sectorsPerCluster * bytesPerSector;
            uint hosize;
            uint losize = GetCompressedFileSizeW(file, out hosize);
            long size;
            size = (long)hosize << 32 | losize;
            return ((size + clusterSize - 1) / clusterSize) * clusterSize;
        }

        [DllImport("kernel32.dll")]
        static extern uint GetCompressedFileSizeW([In, MarshalAs(UnmanagedType.LPWStr)] string lpFileName,
            [Out, MarshalAs(UnmanagedType.U4)] out uint lpFileSizeHigh);

        [DllImport("kernel32.dll", SetLastError = true, PreserveSig = true)]
        static extern int GetDiskFreeSpaceW([In, MarshalAs(UnmanagedType.LPWStr)] string lpRootPathName,
            out uint lpSectorsPerCluster, out uint lpBytesPerSector, out uint lpNumberOfFreeClusters,
            out uint lpTotalNumberOfClusters);

        public void GetProvider()
        {
            Provider = new MultipartMemoryStreamProvider();
            // путь к папке на сервере
            Root = System.Web.HttpContext.Current.Server.MapPath("~/Applications/");
            IconDefaultPath = System.Web.HttpContext.Current.Server.MapPath("~/Default/") + "DefaultLogo.png";
        }

        //считывает zip отпрвленный клиентом

        public async System.Threading.Tasks.Task ReadFileAsync()
        {

            foreach (var file in Provider.Contents)
            {


                Path = Guid.NewGuid().ToString() + ".zip";
                PathIcon = Path.Split('.')[0] + "Icon.png";

                byte[] fileArray = await file.ReadAsByteArrayAsync();

                using (FileStream fs = new FileStream(Root + Path, FileMode.Create))
                {
                    await fs.WriteAsync(fileArray, 0, fileArray.Length);
                    fs.Close();
                }
            }
        }



        public async System.Threading.Tasks.Task<List<Error>> ValidateAsync()
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
                    if (Item.Name == "manifest.xml" || Item.Name == "Application.png")
                    {
                        if (Item.Name == "Application.png")
                        {

                            ImageData = null;
                            Icon = true;

                            // считываем переданный файл в массив байтов
                            StreamReader s = new StreamReader(Zipfile.GetInputStream(Item));

                            ImageData = s;

                            var img = Image.FromStream(ImageData.BaseStream);

                            img.Save(Root + PathIcon);

              

                            s.Close();   
                        }

                        if (Item.Name == "manifest.xml")
                        {
                            Setting = true;


                            StreamReader s = new StreamReader(Zipfile.GetInputStream(Item));
                            

                            XDocument xdoc = XDocument.Parse(await s.ReadToEndAsync());

                            //Validate Manifest xml

                            XmlSchemaSet schemaSet = new XmlSchemaSet();
                            schemaSet.Add(null, Root + "Application.xsd");
                            try
                            {
                                xdoc.Validate(schemaSet, null);

                            }
                            catch (XmlSchemaValidationException ex)
                            {
                                listErrors.Add(new Error() { Name = "ValidManifest", Text = ex.Message });
                            }

                            s.Close();

                          

                            foreach (XElement appElement in xdoc.Element("settings").Elements("App"))
                            {


                                App.Name = appElement.Attribute("name").Value;
                                if (App.Name == "")
                                {
                                    listErrors.Add(new Error() { Name = "Name", Text = "В файле настроек нет атрибута Name" });
                                }


                                App.Author = appElement.Element("Author").Value;
                                if (App.Author == "")
                                {
                                    listErrors.Add(new Error() { Name = "Author", Text = "В файле настроек нет атрибута NameUser" });
                                }



                                App.Version = appElement.Element("version").Value;
                                if (App.Version == "")
                                {
                                    listErrors.Add(new Error() { Name = "version", Text = "version" });
                                }



                                App.Description = appElement.Element("Description").Value;
                                if (App.Description == "")
                                {
                                    listErrors.Add(new Error() { Name = "Description", Text = "В файле настроек нет атрибута Description" });
                                }



                                App.Package = appElement.Element("ApplicationId").Value;
                                if (App.Package == "")
                                {
                                    listErrors.Add(new Error() { Name = "ApplicationId", Text = "В файле настроек нет атрибута ApplicationId" });
                                }





                                if (App.Package != null)
                                {
                                    if (db.Applications.Count(p => p.Package == App.Package) != 0)
                                    {
                                        listErrors.Add(new Error() { Name = "Using", Text = "Такое приложение уже существует" });
                                    }
                                }
                            }
                        }
                    }
                }

                if (Setting == false)
                {
                    listErrors.Add(new Error() { Name = "setting", Text = "Не обнаружено файла с настройками" });
                }

                if(!Icon)
                {
                    StreamReader s = new StreamReader(IconDefaultPath);
                    ImageData = s;
                    var img = Image.FromStream(ImageData.BaseStream);
                    img.Save(PathIcon);

                    /* MemoryStream ms = new MemoryStream();
                     s.BaseStream.CopyTo(ms);
                     ImageData = ms.ToArray();*/

                    s.Close();
                }

                Zip.Close();
                Zipfile.Close();
                Filestream.Close();

                return listErrors;
            }

            catch (Exception e)
            {
                List<Error> listErrors = new List<Error>
                {
                    new Error() {Name = "ValidateApp", Text = "Неизвестая Ошибка Валидации"}
                };
                return listErrors;
            }
        }
    }
}