using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLTransactionRepository : ITransactionRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLTransactionRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Transaction> CreateAsync(Transaction transaction)
        {
            await dbContext.Transactions.AddAsync(transaction);
            await dbContext.SaveChangesAsync();
            return transaction;
        }

        public async Task<Transaction> DeleteAsync(int id)
        {
            var existingTransaction = await dbContext.Transactions.FirstOrDefaultAsync(x => x.TransactionID == id);

            if (existingTransaction == null)
            {
                return null;
            }

            dbContext.Transactions.Remove(existingTransaction);

            await dbContext.SaveChangesAsync();

            return existingTransaction;
        }

        public async Task<List<Transaction>> GetAllAsync()
        {
            return await dbContext.Transactions.Include("User").ToListAsync();
        }

        public async Task<Transaction?> GetByIdAsync(int id)
        {
            return await dbContext.Transactions
                .Include("User")
                .FirstOrDefaultAsync(x => x.TransactionID == id);
        }

        public async Task<Transaction?> UpdateAsync(int id, Transaction transaction)
        {
            var existingTransaction = await dbContext.Transactions.FirstOrDefaultAsync(x => x.TransactionID == id);

            if (existingTransaction == null)
            {
                return null;
            }

            existingTransaction.UserID = transaction.UserID;
            existingTransaction.PaymentMethodID = transaction.PaymentMethodID;
            existingTransaction.Type = transaction.Type;
            existingTransaction.Amount = transaction.Amount;
            existingTransaction.Date = transaction.Date;
            existingTransaction.Description = transaction.Description;

            await dbContext.SaveChangesAsync();

            return existingTransaction;
        }
    }
}
