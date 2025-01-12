using ExpenseTracker.UI.Models;
using ExpenseTracker.UI.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Text;
using System.Text.Json;
namespace ExpenseTracker.UI.Controllers
{
    public class UsersController : Controller
    {
        private readonly IHttpClientFactory httpClientFactory;

        public UsersController(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
        }
        public async Task<IActionResult> Index()
        {
            List<UserDto> response = new List<UserDto>();

            try
            {

                var client = httpClientFactory.CreateClient();

                var httpResponseMessage = await client.GetAsync("https://localhost:7058/api/users");
                
                httpResponseMessage.EnsureSuccessStatusCode();

                response.AddRange(await httpResponseMessage.Content.ReadFromJsonAsync<IEnumerable<UserDto>>());

            }
            catch (Exception ex)
            {  
                //
            }

            return View(response);
        }

        [HttpGet]

        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddUserViewModel model)
        {
            var client = httpClientFactory.CreateClient();

            var httpRequestMessage = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://localhost:7058/api/users"),
                Content = new StringContent(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json")
            };

            var httpResponseMessage = await client.SendAsync(httpRequestMessage);
            httpResponseMessage.EnsureSuccessStatusCode();

            var response = await httpResponseMessage.Content.ReadFromJsonAsync<UserDto>();

            if(response is not null)
            {
                return RedirectToAction("Index", "Users");
            }
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var client = httpClientFactory.CreateClient();

            var response =
                await client.GetFromJsonAsync<UserDto>($"https://localhost:7058/api/users/{id.ToString()}");

            if (response is not null)
            {
                return View(response);
            }

            return View(null);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(UserDto request)
        {
            var client = httpClientFactory.CreateClient();

            var httpRequestMessage = new HttpRequestMessage()
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri($"https://localhost:7058/api/users/{request.UserID}"),
                Content = new StringContent(JsonSerializer.Serialize(request), Encoding.UTF8, "application/json")
            };

            var httpResponseMessage = await client.SendAsync(httpRequestMessage);
            httpResponseMessage.EnsureSuccessStatusCode();

            var response = await httpResponseMessage.Content.ReadFromJsonAsync<UserDto>();


            if (response is not null)
            {

                return RedirectToAction("Edit", "Users");

            }

            return View();

        }

        [HttpPost]
        public async Task<IActionResult> Delete(UserDto request)
        {
            try
            {
                var client = httpClientFactory.CreateClient();

                var httpResponseMessage = await client.DeleteAsync($"https://localhost:7058/api/users/{request.UserID}");
                httpResponseMessage.EnsureSuccessStatusCode();

                return RedirectToAction("Index", "Users");
            }
            catch (Exception ex)
            {

            }

            return View("Edit");
        }


    }
}
