using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.API.Controllers
{
    //https://localhost:portnumber/api/regions
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public RegionsController(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get All Regions
        [HttpGet]
        public IActionResult GetAll()
        {

            var regions = dbContext.Regions.ToList();

            return Ok(regions);
        }
    }
}
