using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IPaymentMethodRepository
    {
        Task<List<PaymentMethod>> GetAllAsync();

        Task<PaymentMethod?> GetByIdAsync(int id);

        Task<PaymentMethod> CreateAsync(PaymentMethod paymentMethod);

        Task<PaymentMethod?> UpdateAsync(int id, PaymentMethod paymentMethod);

        Task<PaymentMethod> DeleteAsync(int id);
    }
}
