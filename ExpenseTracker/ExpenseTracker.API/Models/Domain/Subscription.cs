using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class Subscription
    {
        public int SubscriptionID { get; set; }
        public string UserID { get; set; }
        public int CurrencyID { get; set; }
        public string ServiceName { get; set; }
        public decimal Cost { get; set; }
        public DateTime RenewalDate { get; set; }
        public bool IsActive { get; set; }

        public IdentityUser User { get; set; } 
        public Currency Currency { get; set; }
    }
}
