using AutoMapper;
using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using ExpenseTracker.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        public async Task<IActionResult> Create([FromBody] AddTeamDTO addTeamDTO)
        {

            var teamDomainModel = mapper.Map<Team>(addTeamDTO);

            try
            {
                dbContext.Teams.Add(teamDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the team.");
            }

            var teamDto = mapper.Map<TeamDTO>(teamDomainModel);
            return Ok(teamDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var teams = await teamRepo.GetAllAsync();

            var teamsDto = mapper.Map<List<TeamDTO>>(teams);

            return Ok(teamsDto);
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

            return Ok(mapper.Map<TeamDTO>(team));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTeamDTO updateTeamDTO)
        {
            var teamDomainModel = mapper.Map<Team>(updateTeamDTO);

            teamDomainModel = await teamRepo.UpdateAsync(id, teamDomainModel);

            if (teamDomainModel == null)
            {
                return NotFound();
            }

            var teamDto = mapper.Map<TeamDTO>(teamDomainModel);

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

            var teamDto = mapper.Map<TeamDTO>(teamDomainModel);

            return Ok(teamDto);
        }
    }
}
