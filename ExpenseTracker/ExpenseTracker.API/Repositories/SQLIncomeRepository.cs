using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public class SQLIncomeRepository : IIncomeRepository
    {
        public Task<Income> CreateAsync(Income income)
        {
            throw new NotImplementedException();
        }

        public Task<Income> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Income>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Income?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Income?> UpdateAsync(int id, Income income)
        {
            throw new NotImplementedException();
        }
    }
}
