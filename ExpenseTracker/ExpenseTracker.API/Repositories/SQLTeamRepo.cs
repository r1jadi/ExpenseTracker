using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLTeamRepo : ITeamRepo
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLTeamRepo(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Team> CreateAsync(Team team)
        {
            await dbContext.Teams.AddAsync(team);
            await dbContext.SaveChangesAsync();
            return team;
        }

        public async Task<Team> DeleteAsync(int id)
        {
            var existingTeam = await dbContext.Teams.FirstOrDefaultAsync(x => x.TeamID == id);

            if (existingTeam == null)
            {
                return null;
            }

            dbContext.Teams.Remove(existingTeam);

            await dbContext.SaveChangesAsync();

            return existingTeam;
        }

        public async Task<List<Team>> GetAllAsync()
        {
            return await dbContext.Teams.Include("Player").ToListAsync();
        }

        public async Task<Team?> GetByIdAsync(int id)
        {
            return await dbContext.Teams
                .Include("Player")
                .FirstOrDefaultAsync(x => x.TeamID == id);
        }

        public async Task<Team?> UpdateAsync(int id, Team team)
        {
            var existingTeam = await dbContext.Teams.FirstOrDefaultAsync(x => x.TeamID == id);

            if (existingTeam == null)
            {
                return null;
            }

            existingTeam.Name = team.Name;

            await dbContext.SaveChangesAsync();

            return existingTeam;
        }
    }
}
