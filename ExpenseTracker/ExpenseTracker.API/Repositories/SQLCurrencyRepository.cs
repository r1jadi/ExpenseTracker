using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLCurrencyRepository : ICurrencyRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLCurrencyRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Currency> CreateAsync(Currency currency)
        {
            await dbContext.Currencies.AddAsync(currency);
            await dbContext.SaveChangesAsync();
            return currency;
        }

        public async Task<Currency> DeleteAsync(int id)
        {
            var existingCurrency = await dbContext.Currencies.FirstOrDefaultAsync(x => x.CurrencyID == id);
            if (existingCurrency == null)
            {
                return null;
            }

            dbContext.Currencies.Remove(existingCurrency);
            await dbContext.SaveChangesAsync();
            return existingCurrency;
        }

        public async Task<List<Currency>> GetAllAsync()
        {
            return await dbContext.Currencies.ToListAsync();
        }

        public async Task<Currency?> GetByIdAsync(int id)
        {
            return await dbContext.Currencies.FirstOrDefaultAsync(x => x.CurrencyID == id);
        }

        public async Task<Currency?> UpdateAsync(int id, Currency currency)
        {
            var existingCurrency = await dbContext.Currencies.FirstOrDefaultAsync(x => x.CurrencyID == id);

            if (existingCurrency == null)
            {
                return null;
            }

            existingCurrency.Code = currency.Code;
            existingCurrency.Name = currency.Name;
            existingCurrency.Symbol = currency.Symbol;


            await dbContext.SaveChangesAsync();
            return existingCurrency;
        }
    }
}
