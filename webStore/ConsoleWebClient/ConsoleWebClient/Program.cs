using System;

namespace ConsoleWebClient
{
    internal class Program
    {
        private static readonly string path = "http://localhost:23447/";
        private static API api = new API(path);




        static void Main()
        {
            OutMenu();
            Console.ReadKey();
        }

        //метод вызывающий апишку регистрации

        static void Register()
        {
            Console.WriteLine("Введите логин:");
            string userName = Console.ReadLine();

            Console.WriteLine("Введите пароль:");
            string password = Console.ReadLine();


            var result = api.RegisterAsync(userName, password).Result;

            Console.WriteLine("Регистрация Успешно Завершена");
            Console.WriteLine("Responce:\n" + result.Responce);
            OutMenu();
        }


        //метод вызывающий апишку авторизации
        static void Auth()
        {
            Console.WriteLine("Введите логин:");
            string userName = Console.ReadLine();

            Console.WriteLine("Введите пароль:");
            string password = Console.ReadLine();


            var result = api.GetTokenAsync(userName, password).Result;


            Console.WriteLine("Авторизация Успешно Завершена");
            Console.WriteLine("Responce:\n" + result.Responce);
            OutMenuUser();





        }

        //вывод меню

        static void OutMenu()
        {
            Console.WriteLine("Меню\nВыберитеДействие:\n1-Авторизоваться:\n2-Зарегистрироваться:");
            int change = 0;
            try
            {
                change = Convert.ToInt32(Console.ReadLine());
            }

            catch (Exception) { Console.WriteLine("Команда должна быть числом"); OutMenu(); }

            switch (change)
            {
                case 1:
                    Console.WriteLine("Авторизация");
                    Auth();
                    break;
                case 2:
                    Console.WriteLine("Регистрация");
                    Register();
                    break;

                default:
                    Console.WriteLine("Неправильная команда");
                    OutMenu();
                    break;
            }
        }

        //вывод меню юзера
        static void OutMenuUser()
        {
            Console.WriteLine("Меню\nВыберитеДействие:\n1-Установить приложение\n2-Установить Обновление\n3-Получить Информацию о текущем Пользователе\n4-Посмотреть список Обновлний приложения");
            int change;
            try
            {
                change = Convert.ToInt32(Console.ReadLine());
            }

            catch (Exception) { Console.WriteLine("Команда должна быть числом"); OutMenuUser(); return; }

            switch (change)
            {
                case 1:
                    Console.WriteLine("Установка приложения");
                    Install();
                    break;

                case 2:
                    Console.WriteLine("Установка обновления");
                    InstallUpd();
                    break;

                case 3:
                    Console.WriteLine("Информация о Пользователе");
                    GetUserInfo();
                    break;
                case 4:
                    Console.WriteLine("Информация о Пользователе");
                    GetUserUpdates();
                    break;

                default:
                    Console.WriteLine("Неправильная команда");
                    OutMenu();
                    break;
            }
        }


        static async void InstallUpd()
        {
            Console.WriteLine("Введите Id приложения");

            string id = Console.ReadLine();

            Console.WriteLine("Введите имя пакета");

            string package = Console.ReadLine();

            Console.WriteLine("Введите версию обновления");

            string version = Console.ReadLine();
            await api.InstallUpdAsync(api.Token, id, package,version);
            Console.WriteLine("Успешно Установлено");
            OutMenuUser();
        }


        static async void Install()
        {
            Console.WriteLine("Введите Id приложения");

            string id = Console.ReadLine();

            Console.WriteLine("Введите имя пакета");

            string package = Console.ReadLine();

            await api.InstallAppAsync(api.Token,id,package);

            Console.WriteLine("Успешно Установлено");

            OutMenuUser();
        }


        static void GetUserInfo()
        {


            var result = api.GetUserInfoAsync(api.Token).Result;
            Console.WriteLine("Информация:\n" + result.Responce);
            OutMenuUser();
        }


        static void GetUserUpdates()
        {
            Console.WriteLine("Введите Id приложения");
            string id = Console.ReadLine();
            var result = api.GetUserUpdates(api.Token, id).Result;
            Console.WriteLine("Обновления:\n" + result.Responce);
            OutMenuUser();
        }


    }
}