using ExpenseTracker.UI.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.UI.Controllers
{
    public class RegionsController : Controller
    {
        private readonly IHttpClientFactory httpClientFactory;

        public RegionsController(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
        }

        public async Task<IActionResult> Index()
        {

            List<RegionDto> response = new List<RegionDto>();

            try
            {

                //get all regions from web api
                var client = httpClientFactory.CreateClient();

                var httpResponseMessage = await client.GetAsync("https://localhost:7058/api/regions");

                httpResponseMessage.EnsureSuccessStatusCode();

                response.AddRange(await httpResponseMessage.Content.ReadFromJsonAsync<IEnumerable<RegionDto>>());

            
            }
            catch (Exception ex)
            {
                //log the exception
            }


            return View(response);
        }
    }
}
