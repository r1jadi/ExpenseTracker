using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class Income
    {
        public int IncomeID { get; set; }
        public string UserID { get; set; } 
        public int CurrencyID { get; set; }
        public decimal Amount { get; set; }
        public string Source { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public IdentityUser User { get; set; } 
        public Currency Currency { get; set; }
    }
}
