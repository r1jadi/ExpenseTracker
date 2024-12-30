using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class IncomeDto
    {
        public int IncomeID { get; set; }
        public int UserID { get; set; }
        public int CurrencyID { get; set; }
        public decimal Amount { get; set; }
        public string Source { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //relationships

        public User User { get; set; }
        public Currency Currency { get; set; }
    }
}
