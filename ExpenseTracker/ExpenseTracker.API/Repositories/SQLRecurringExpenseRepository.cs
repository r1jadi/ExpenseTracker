using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLRecurringExpenseRepository : IRecurringExpenseRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLRecurringExpenseRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<RecurringExpense> CreateAsync(RecurringExpense recurringExpense)
        {
            await dbContext.RecurringExpenses.AddAsync(recurringExpense);
            await dbContext.SaveChangesAsync();
            return recurringExpense;
        }

        public async Task<RecurringExpense> DeleteAsync(int id)
        {
            var existingRecurringExpense = await dbContext.RecurringExpenses.FirstOrDefaultAsync(x => x.RecurringExpenseID == id);

            if (existingRecurringExpense == null)
            {
                return null;
            }

            dbContext.RecurringExpenses.Remove(existingRecurringExpense);

            await dbContext.SaveChangesAsync();

            return existingRecurringExpense;
        }

        public async Task<List<RecurringExpense>> GetAllAsync()
        {
            return await dbContext.RecurringExpenses.Include("User").ToListAsync();
        }

        public async Task<RecurringExpense?> GetByIdAsync(int id)
        {
            return await dbContext.RecurringExpenses
                .Include("User")
                .FirstOrDefaultAsync(x => x.RecurringExpenseID == id);
        }

        public async Task<RecurringExpense?> UpdateAsync(int id, RecurringExpense recurringExpense)
        {
            var existingRecurringExpense = await dbContext.RecurringExpenses.FirstOrDefaultAsync(x => x.RecurringExpenseID == id);

            if (existingRecurringExpense == null)
            {
                return null;
            }

            existingRecurringExpense.UserID = recurringExpense.UserID;
            existingRecurringExpense.Amount = recurringExpense.Amount;
            existingRecurringExpense.Interval = recurringExpense.Interval;
            existingRecurringExpense.NextDueDate = recurringExpense.NextDueDate;
            existingRecurringExpense.Description = recurringExpense.Description;

            await dbContext.SaveChangesAsync();

            return existingRecurringExpense;
        }
    }
}
