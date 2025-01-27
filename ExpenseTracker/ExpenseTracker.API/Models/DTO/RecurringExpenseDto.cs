using ExpenseTracker.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.DTO
{
    public class RecurringExpenseDto
    {
        public int RecurringExpenseID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public decimal Amount { get; set; }
        public string Interval { get; set; }
        public DateTime NextDueDate { get; set; }
        public string Description { get; set; }

        // Relationship
        public IdentityUser User { get; set; } // Updated to use IdentityUser
    }
}
