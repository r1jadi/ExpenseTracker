namespace ExpenseTracker.API.Models.DTO
{
    public class UpdateExpenseDto
    {
        public string UserID { get; set; }
        public int CategoryID { get; set; }
        public int CurrencyID { get; set; }
        public int? RecurringExpenseID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public bool IsRecurring { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
