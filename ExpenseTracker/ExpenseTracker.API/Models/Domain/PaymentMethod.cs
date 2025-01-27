using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class PaymentMethod
    {
        public int PaymentMethodID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public string Name { get; set; }
        public string? Details { get; set; }

        // Relationships
        public IdentityUser User { get; set; } // Updated to use IdentityUser
        public ICollection<Transaction> Transactions { get; set; }
    }
}
