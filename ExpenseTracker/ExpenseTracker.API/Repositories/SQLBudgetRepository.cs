using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLBudgetRepository : IBudgetRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLBudgetRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Budget> CreateAsync(Budget budget)
        {
            await dbContext.Budgets.AddAsync(budget);
            await dbContext.SaveChangesAsync();
            return budget;
        }

        public async Task<Budget> DeleteAsync(int id)
        {
            var existingBudget = await dbContext.Budgets.FirstOrDefaultAsync(x => x.BudgetID == id);

            if (existingBudget == null)
            {
                return null;
            }

            dbContext.Budgets.Remove(existingBudget);

            await dbContext.SaveChangesAsync();

            return existingBudget;
        }

        public async Task<List<Budget>> GetAllAsync()
        {
            return await dbContext.Budgets.Include("User").Include("Category").ToListAsync();
        }

        public async Task<Budget?> GetByIdAsync(int id)
        {
            return await dbContext.Budgets
                .Include("User")
                .Include("Category")
                .FirstOrDefaultAsync(x => x.BudgetID == id);
        }

        public async Task<Budget?> UpdateAsync(int id, Budget budget)
        {
            var existingBudget = await dbContext.Budgets.FirstOrDefaultAsync(x => x.BudgetID == id);

            if (existingBudget == null)
            {
                return null;
            }

            existingBudget.UserID = budget.UserID;
            existingBudget.CategoryID = budget.CategoryID;
            existingBudget.Limit = budget.Limit;
            existingBudget.Period = budget.Period;
            existingBudget.StartDate = budget.StartDate;
            existingBudget.EndDate = budget.EndDate;

            await dbContext.SaveChangesAsync();

            return existingBudget;
        }
    }
}
