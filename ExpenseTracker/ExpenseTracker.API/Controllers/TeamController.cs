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
    public class TeamController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly ITeamRepo teamRepo;
        private readonly IMapper mapper;

        public TeamController(ExpenseTrackerDbContext dbContext,
            ITeamRepo teamRepo,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.teamRepo = teamRepo;
            this.mapper = mapper;
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddTeamDto addTeamDto)
        {

            var teamDomainModel = mapper.Map<Team>(addTeamDto);

            try
            {
                dbContext.Teams.Add(teamDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the team.");
            }

            var teamDto = mapper.Map<TeamDto>(teamDomainModel);
            return Ok(teamDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (User.IsInRole("Admin"))
            {
                var allTeams = await teamRepo.GetAllAsync();
                return Ok(mapper.Map<List<TeamDto>>(allTeams));
            }

            var userTeams = await dbContext.Teams
                .Where(b => b.TeamID.Equals(userId))
                .ToListAsync();

            return Ok(mapper.Map<List<TeamDto>>(userTeams));
        }


        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var team = await teamRepo.GetByIdAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<TeamDto>(team));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTeamDto updateTeamDto)
        {
            var teamDomainModel = mapper.Map<Team>(updateTeamDto);

            teamDomainModel = await teamRepo.UpdateAsync(id, teamDomainModel);

            if (teamDomainModel == null)
            {
                return NotFound();
            }

            var teamDto = mapper.Map<TeamDto>(teamDomainModel);

            return Ok(teamDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var teamDomainModel = await teamRepo.DeleteAsync(id);

            if (teamDomainModel == null)
            {
                return NotFound();
            }

            var teamDto = mapper.Map<TeamDto>(teamDomainModel);

            return Ok(teamDto);
        }
    }
}
