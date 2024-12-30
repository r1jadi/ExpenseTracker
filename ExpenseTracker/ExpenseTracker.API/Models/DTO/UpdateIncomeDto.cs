namespace ExpenseTracker.API.Models.DTO
{
    public class UpdateIncomeDto
    {
        public int UserID { get; set; }
        public int CurrencyID { get; set; }
        public decimal Amount { get; set; }
        public string Source { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
