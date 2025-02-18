using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class Transaction
    {
        public int TransactionID { get; set; }
        public string UserID { get; set; } 
        public int? PaymentMethodID { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }

        public IdentityUser User { get; set; } 
        public PaymentMethod PaymentMethod { get; set; }
    }
}
