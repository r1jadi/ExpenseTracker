using AutoMapper;
using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using ExpenseTracker.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UsersController(ExpenseTrackerDbContext dbContext,
            IUserRepository userRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddUserRequestDto addUserRequestDto)
        {

            var userDomainModel = mapper.Map<User>(addUserRequestDto);

            userDomainModel = await userRepository.CreateAsync(userDomainModel);

            var userDto = mapper.Map<UserDto>(userDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = userDto.UserID }, userDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await userRepository.GetAllAsync();

            var usersDto = mapper.Map<List<UserDto>>(users);

            return Ok(usersDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var user = await userRepository.GetByIdAsync(id);

            if(user == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<UserDto>(user));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateRegionRequestDto updateRegionRequestDto)
        {
            var userDomainModel = mapper.Map<User>(updateRegionRequestDto);

            userDomainModel = await userRepository.UpdateAsync(id, userDomainModel);

            if (userDomainModel == null)
            {
                return NotFound();
            }

            var userDto = mapper.Map<UserDto>(userDomainModel);

            return Ok(userDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userDomainModel = await userRepository.DeleteAsync(id);

            if(userDomainModel == null)
            {
                return NotFound();
            }

            var userDto = mapper.Map<UserDto> (userDomainModel);

            return Ok(userDto);
        }

    }
}
