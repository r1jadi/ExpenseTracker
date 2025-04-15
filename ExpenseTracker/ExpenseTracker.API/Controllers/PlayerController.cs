using AutoMapper;
using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using ExpenseTracker.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IPlayerRepo playerRepo;
        private readonly IMapper mapper;

        public PlayerController(ExpenseTrackerDbContext dbContext,
            IPlayerRepo playerRepo,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.playerRepo = playerRepo;
            this.mapper = mapper;
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddPlayerDto addPlayerDto)
        {

            var playerDomainModel = mapper.Map<Player>(addPlayerDto);

            try
            {
                dbContext.Players.Add(playerDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the player.");
            }

            var playerDto = mapper.Map<PlayerDto>(playerDomainModel);
            return Ok(playerDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (User.IsInRole("Admin"))
            {
                var allPlayers = await playerRepo.GetAllAsync();
                return Ok(mapper.Map<List<PlayerDto>>(allPlayers));
            }

            var userPlayers = await dbContext.Players
                .Where(b => b.PlayerID.Equals(userId))
                .ToListAsync();

            return Ok(mapper.Map<List<PlayerDto>>(userPlayers));
        }


        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var player = await playerRepo.GetByIdAsync(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<PlayerDto>(player));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePlayerDto updatePlayerDto)
        {
            var playerDomainModel = mapper.Map<Player>(updatePlayerDto);

            playerDomainModel = await playerRepo.UpdateAsync(id, playerDomainModel);

            if (playerDomainModel == null)
            {
                return NotFound();
            }

            var playerDto = mapper.Map<PlayerDto>(playerDomainModel);

            return Ok(playerDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var playerDomainModel = await playerRepo.DeleteAsync(id);

            if (playerDomainModel == null)
            {
                return NotFound();
            }

            var playerDto = mapper.Map<PlayerDto>(playerDomainModel);

            return Ok(playerDto);
        }
    }
}
