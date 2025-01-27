using ExpenseTracker.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.DTO
{
    public class ExpenseDto
    {

        public int ExpenseID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public int CategoryID { get; set; }
        public int CurrencyID { get; set; }
        public int? RecurringExpenseID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public bool IsRecurring { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Relationships
        public IdentityUser User { get; set; } // Updated to use IdentityUser
        public Category Category { get; set; }
        public Currency Currency { get; set; }
        public RecurringExpense? RecurringExpense { get; set; }
        public ICollection<ExpenseTag> ExpenseTags { get; set; }
    }
}
