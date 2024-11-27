﻿using ExpenseTracker.UI.Models;
using ExpenseTracker.UI.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

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


        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddRegionViewModel model)
        {
            var client = httpClientFactory.CreateClient();

            var httpRequestMessage = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri ("https://localhost:7058/api/regions"),
                Content = new StringContent(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json")
            };

            var httpResponseMessage =  await client.SendAsync(httpRequestMessage);
            httpResponseMessage.EnsureSuccessStatusCode();

            var response = await httpResponseMessage.Content.ReadFromJsonAsync<RegionDto>();
            
            if(response is not null)
            {
                return RedirectToAction("Index", "Regions");
            }

            return View();
        
        }

        
        [HttpGet]
        public async Task<IActionResult> Edit(Guid id)
        {

            var client = httpClientFactory.CreateClient();

            var response
                = await client.GetFromJsonAsync<RegionDto>($"https://localhost:7058/api/regions/{id.ToString()}");

            if (response is not null) {
                return View(response);
            }

            return View(null);
        }
    
    }
}
