using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLPlayerRepo : IPlayerRepo
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLPlayerRepo(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Player> CreateAsync(Player player)
        {
            await dbContext.Players.AddAsync(player);
            await dbContext.SaveChangesAsync();
            return player;
        }

        public async Task<Player> DeleteAsync(int id)
        {
            var existingPlayer = await dbContext.Players.FirstOrDefaultAsync(x => x.PlayerId == id);

            if (existingPlayer == null)
            {
                return null;
            }

            dbContext.Players.Remove(existingPlayer);

            await dbContext.SaveChangesAsync();

            return existingPlayer;
        }

        public async Task<List<Player>> GetAllAsync()
        {
            return await dbContext.Players.Include("Team").ToListAsync();
        }

        public async Task<Player?> GetByIdAsync(int id)
        {
            return await dbContext.Players
                .Include("Team")
                .FirstOrDefaultAsync(x => x.PlayerId == id);
        }

        public async Task<Player?> UpdateAsync(int id, Player player)
        {
            var existingPlayer = await dbContext.Players.FirstOrDefaultAsync(x => x.PlayerId == id);

            if (existingPlayer == null)
            {
                return null;
            }

            existingPlayer.Name = player.Name;
            existingPlayer.Number = player.Number;
            existingPlayer.BirthYear = player.BirthYear;
            existingPlayer.TeamId= player.TeamId;

            await dbContext.SaveChangesAsync();

            return existingPlayer;
        }
    }
}
