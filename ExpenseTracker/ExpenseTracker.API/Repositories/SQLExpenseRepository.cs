using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLExpenseRepository : IExpenseRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLExpenseRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Expense> CreateAsync(Expense expense)
        {
            await dbContext.Expenses.AddAsync(expense);
            await dbContext.SaveChangesAsync();
            return expense;
        }

        public async Task<Expense> DeleteAsync(int id)
        {
            var existingExpense = await dbContext.Expenses.FirstOrDefaultAsync(x => x.ExpenseID == id);

            if (existingExpense == null)
            {
                return null;
            }

            dbContext.Expenses.Remove(existingExpense);

            await dbContext.SaveChangesAsync();

            return existingExpense;
        }

        public async Task<List<Expense>> GetAllAsync()
        {
            return await dbContext.Expenses.Include("User").Include("Category").Include("Currency").Include("RecurringExpense").ToListAsync();
        }

        public async Task<Expense?> GetByIdAsync(int id)
        {
            return await dbContext.Expenses
                .Include("User")
                .Include("Category")
                .Include("Currency")
                .Include("RecurringExpense")
                .FirstOrDefaultAsync(x => x.ExpenseID == id);
        }

        public async Task<Expense?> UpdateAsync(int id, Expense expense)
        {
            var existingExpense = await dbContext.Expenses.FirstOrDefaultAsync(x => x.ExpenseID == id);

            if (existingExpense == null)
            {
                return null;
            }

            existingExpense.UserID = expense.UserID;
            existingExpense.CategoryID = expense.CategoryID;
            existingExpense.CurrencyID = expense.CurrencyID;
            existingExpense.RecurringExpenseID = expense.RecurringExpenseID;
            existingExpense.Amount = expense.Amount;
            existingExpense.Date = expense.Date;
            existingExpense.Description = expense.Description;
            existingExpense.IsRecurring = expense.IsRecurring;
            existingExpense.CreatedAt = expense.CreatedAt;
            existingExpense.UpdatedAt = expense.UpdatedAt;

            await dbContext.SaveChangesAsync();

            return existingExpense;
        }
    }
}
