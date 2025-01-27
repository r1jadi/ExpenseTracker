using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class Subscription
    {
        public int SubscriptionID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public int CurrencyID { get; set; }
        public string ServiceName { get; set; }
        public decimal Cost { get; set; }
        public DateTime RenewalDate { get; set; }
        public bool IsActive { get; set; }

        // Relationships
        public IdentityUser User { get; set; } // Updated to use IdentityUser
        public Currency Currency { get; set; }
    }
}
