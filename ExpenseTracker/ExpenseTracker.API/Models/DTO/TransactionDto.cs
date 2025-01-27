using ExpenseTracker.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.DTO
{
    public class TransactionDto
    {
        public int TransactionID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public int? PaymentMethodID { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }

        // Relationships
        public IdentityUser User { get; set; } // Updated to use IdentityUser
        public PaymentMethod PaymentMethod { get; set; }
    }
}
