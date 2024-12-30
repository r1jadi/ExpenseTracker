using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLGoalRepository : IGoalRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLGoalRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Goal> CreateAsync(Goal goal)
        {
            await dbContext.Goals.AddAsync(goal);
            await dbContext.SaveChangesAsync();
            return goal;
        }

        public async Task<Goal> DeleteAsync(int id)
        {
            var existingGoal = await dbContext.Goals.FirstOrDefaultAsync(x => x.GoalID == id);

            if (existingGoal == null)
            {
                return null;
            }

            dbContext.Goals.Remove(existingGoal);

            await dbContext.SaveChangesAsync();

            return existingGoal;
        }

        public async Task<List<Goal>> GetAllAsync()
        {
            return await dbContext.Goals.Include("User").ToListAsync();
        }

        public async Task<Goal?> GetByIdAsync(int id)
        {
            return await dbContext.Goals
                .Include("User")
                .FirstOrDefaultAsync(x => x.GoalID == id);
        }

        public async Task<Goal?> UpdateAsync(int id, Goal goal)
        {
            var existingGoal = await dbContext.Goals.FirstOrDefaultAsync(x => x.GoalID == id);

            if (existingGoal == null)
            {
                return null;
            }

            existingGoal.UserID = goal.UserID;
            existingGoal.TargetAmount = goal.TargetAmount;
            existingGoal.Description = goal.Description;
            existingGoal.DueDate = goal.DueDate;

            await dbContext.SaveChangesAsync();

            return existingGoal;
        }
    }
}
