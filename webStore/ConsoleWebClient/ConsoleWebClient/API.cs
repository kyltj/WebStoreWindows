using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net;


namespace ConsoleWebClient
{
    class API
    {
        //Хост сервера
        private readonly string _appPath;
        //Токен доступа
        public string Token { get; set; }

        public API(string path)
        {
            _appPath = path;
        }

        // регистрация
        public async Task<ResultModel> RegisterAsync(string email, string password)
        {
            try
            {
                var registerModel = new
                {
                    Email = email,
                    Password = password,
                    ConfirmPassword = password
                };
                HttpClient client = new HttpClient();

                var response = await client.PostAsJsonAsync(_appPath + "/api/AccountApi/Register", registerModel).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    return new ResultModel() { Responce = response.Content.ReadAsStringAsync().Result };
                }

                else
                {
                    throw new WebClientException(response.ToString());
                }
            }

            catch (Exception inner)
            {
                throw new WebClientException("Ошибка Регистрации", inner);
            }
        }
        // получение токена
        public async Task<ResultModel> GetTokenAsync(string userName, string password)
        {
            try
            {

                Dictionary<string, string> pairs = new Dictionary<string, string>
                {
                    {"grant_type", "password"},
                    {"username", userName},
                    {"Password", password}
                };
                var content = new FormUrlEncodedContent(pairs);

                HttpClient client = new HttpClient();

                var response =
                  await client.PostAsync(_appPath + "/Token", content).ConfigureAwait(false);
                string result = await response.Content.ReadAsStringAsync();

               


                // Десериализация полученного JSON-объекта
                Dictionary<string, string> tokenDictionary =
                    JsonConvert.DeserializeObject<Dictionary<string, string>>(result);

                Token = tokenDictionary["access_token"];


                if (response.IsSuccessStatusCode)
                {
                    return new ResultModel() { Responce = response.Content.ReadAsStringAsync().Result};
                }

                else
                {
                    throw new WebClientException(response.ToString());
                }

            }



            catch (Exception inner)
            {
                throw new WebClientException("Ошибка Получения Токена", inner);
            }
        }

        // создаем http-клиента с токеном 
        public HttpClient CreateClient(string accessToken = "")
        {
            try
            {
                var client = new HttpClient();
                if (!string.IsNullOrWhiteSpace(accessToken))
                {
                    client.DefaultRequestHeaders.Authorization =
                        new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                }
                return client;
            }

            catch (Exception inner)
            {
                throw new WebClientException("Ошибка Создания Клиента", inner);
            }
        }

        // получаем информацию о клиенте 
        public async Task<ResultModel> GetUserInfoAsync(string token)
        {
            try
            {
                HttpClient client = CreateClient(token);
                var response = await client.GetAsync(_appPath + "/api/AccountApi/UserInfo").ConfigureAwait(false);
                
                if (response.IsSuccessStatusCode)
                {
                    return new ResultModel() { Responce = response.Content.ReadAsStringAsync().Result };
                }

                else
                {
                    throw new WebClientException(response.ToString());
                }
            }

            catch (Exception inner)
            {
                throw new WebClientException("Ошибка Получения информации о пользователя", inner);
            }
        }

        public async Task<ResultModel> GetUserUpdates(string token, string idApplication)
        {
            try
            {
                HttpClient client = CreateClient(token);
                var response = await client.GetAsync(_appPath + "/api/Application/" + idApplication).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    return new ResultModel() { Responce = response.Content.ReadAsStringAsync().Result };
                }

                else
                {
                    throw new WebClientException(response.ToString());
                }
            }

            catch (Exception inner)
            {
                throw new WebClientException("Ошибка Получения информации о обновлениях", inner);
            }
        }


        public async Task InstallAppAsync(string token, string id, string package)
        {
            try
            {
                string path = System.IO.Path.GetTempPath() + package + ".zip";

                WebClient client = new WebClient();
                client.Headers.Add("Bearer", token);
                string url = (_appPath + "home/DowloadApp/" + id);
                await client.DownloadFileTaskAsync(url, path).ConfigureAwait(false);

                
            }

            catch (WebException inner)
            {
                throw new WebClientException("Ошибка Закачки Приложения", inner);
            }

            catch (Exception inner)
            {
                throw new WebClientException("Ошибка Закачки Приложения", inner);
            }
        }


        public async Task InstallUpdAsync(string token, string idApp, string namePackage, string version)
        {
            try
            {
                string path = System.IO.Path.GetTempPath() + namePackage + ".zip";

                WebClient client = new WebClient();
                client.Headers.Add("Bearer", token);
                client.Headers.Add("Version", version);
                client.Headers.Add("Id", idApp);
                string url = (_appPath + "home/DowloadUpdConsole/" + idApp);
                await client.DownloadFileTaskAsync(url, path).ConfigureAwait(false);
            }


            catch (WebException inner)
            {
                throw new WebClientException("Ошибка Закачки Обновления", inner);
            }

            catch (Exception inner)
            {
                throw new WebClientException("Ошибка Закачки Обновления", inner);

            }


        }

    }
}
