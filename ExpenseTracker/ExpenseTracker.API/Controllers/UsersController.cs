using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.API.Controllers
{


    //https://localhost:portnumber/api/users
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        
        //GET : https://localhost:portnumber/api/users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            string[] userNames = new string[] { "Rijad", "Liza" };

            return Ok(userNames);
        }
    }
}
