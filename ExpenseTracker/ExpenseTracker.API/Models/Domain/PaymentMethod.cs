using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class PaymentMethod
    {
        public int PaymentMethodID { get; set; }
        public string UserID { get; set; }
        public string Name { get; set; }
        public string? Details { get; set; }

        public IdentityUser User { get; set; } 
        public ICollection<Transaction> Transactions { get; set; }
    }
}
