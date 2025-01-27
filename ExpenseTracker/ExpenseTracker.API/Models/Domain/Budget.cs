using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class Budget
    {
        public int BudgetID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public int CategoryID { get; set; }
        public decimal Limit { get; set; }
        public string Period { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Relationships
        public IdentityUser User { get; set; } // Updated to use IdentityUser
        public Category Category { get; set; }
    }
}
