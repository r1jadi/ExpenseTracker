using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IExpenseRepository
    {
        Task<List<Expense>> GetAllAsync();

        Task<Expense?> GetByIdAsync(int id);

        Task<Expense> CreateAsync(Expense expense);

        Task<Expense?> UpdateAsync(int id, Expense expense);

        Task<Expense> DeleteAsync(int id);
    }
}
