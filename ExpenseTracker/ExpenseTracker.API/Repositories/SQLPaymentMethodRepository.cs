using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLPaymentMethodRepository : IPaymentMethodRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLPaymentMethodRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<PaymentMethod> CreateAsync(PaymentMethod paymentMethod)
        {
            await dbContext.PaymentMethods.AddAsync(paymentMethod);
            await dbContext.SaveChangesAsync();
            return paymentMethod;
        }

        public async Task<PaymentMethod> DeleteAsync(int id)
        {
            var existingPaymentMethod = await dbContext.PaymentMethods.FirstOrDefaultAsync(x => x.PaymentMethodID == id);

            if (existingPaymentMethod == null)
            {
                return null;
            }

            dbContext.PaymentMethods.Remove(existingPaymentMethod);

            await dbContext.SaveChangesAsync();

            return existingPaymentMethod;
        }

        public async Task<List<PaymentMethod>> GetAllAsync()
        {
            return await dbContext.PaymentMethods.Include("User").ToListAsync();
        }

        public async Task<PaymentMethod?> GetByIdAsync(int id)
        {
            return await dbContext.PaymentMethods
                .Include("User")
                .FirstOrDefaultAsync(x => x.PaymentMethodID == id);
        }

        public async Task<PaymentMethod?> UpdateAsync(int id, PaymentMethod paymentMethod)
        {
            var existingPaymentMethod = await dbContext.PaymentMethods.FirstOrDefaultAsync(x => x.PaymentMethodID == id);

            if (existingPaymentMethod == null)
            {
                return null;
            }


            existingPaymentMethod.UserID = paymentMethod.UserID;
            existingPaymentMethod.Name = paymentMethod.Name;
            existingPaymentMethod.Details = paymentMethod.Details;

            await dbContext.SaveChangesAsync();

            return existingPaymentMethod;
        }
    }
}
