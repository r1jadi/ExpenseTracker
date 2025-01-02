using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IRecurringExpenseRepository
    {
        Task<List<RecurringExpense>> GetAllAsync();

        Task<RecurringExpense?> GetByIdAsync(int id);

        Task<RecurringExpense> CreateAsync(RecurringExpense recurringExpense);

        Task<RecurringExpense?> UpdateAsync(int id, RecurringExpense recurringExpense);

        Task<RecurringExpense> DeleteAsync(int id);
    }
}
