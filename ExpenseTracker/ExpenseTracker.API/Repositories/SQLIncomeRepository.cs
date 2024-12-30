using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLIncomeRepository : IIncomeRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLIncomeRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Income> CreateAsync(Income income)
        {
            await dbContext.Incomes.AddAsync(income);
            await dbContext.SaveChangesAsync();
            return income;
        }

        public async Task<Income> DeleteAsync(int id)
        {
            var existingIncome = await dbContext.Incomes.FirstOrDefaultAsync(x => x.IncomeID == id);

            if (existingIncome == null)
            {
                return null;
            }

            dbContext.Incomes.Remove(existingIncome);

            await dbContext.SaveChangesAsync();

            return existingIncome;
        }

        public async Task<List<Income>> GetAllAsync()
        {
            return await dbContext.Incomes.Include("User").Include("Currency").ToListAsync();
        }

        public async Task<Income?> GetByIdAsync(int id)
        {
            return await dbContext.Incomes
                .Include("User")
                .Include("Currency")
                .FirstOrDefaultAsync(x => x.IncomeID == id);
        }

        public async Task<Income?> UpdateAsync(int id, Income income)
        {
            var existingIncome = await dbContext.Incomes.FirstOrDefaultAsync(x => x.IncomeID == id);

            if (existingIncome == null)
            {
                return null;
            }

            existingIncome.UserID = income.UserID;
            existingIncome.CurrencyID = income.CurrencyID;
            existingIncome.Amount = income.Amount;
            existingIncome.Source = income.Source;
            existingIncome.Date = income.Date;
            existingIncome.Description = income.Description;
            existingIncome.CreatedAt = income.CreatedAt;
            existingIncome.UpdatedAt = income.UpdatedAt;


            await dbContext.SaveChangesAsync();

            return existingIncome;
        }
    }
}
