namespace ExpenseTracker.API.Models.DTO
{
    public class AddRecurringExpenseDto
    {
        public int UserID { get; set; }
        public decimal Amount { get; set; }
        public string Interval { get; set; }
        public DateTime NextDueDate { get; set; }
        public string Description { get; set; }
    }
}
