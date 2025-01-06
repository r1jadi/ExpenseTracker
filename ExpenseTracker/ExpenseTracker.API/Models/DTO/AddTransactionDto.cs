namespace ExpenseTracker.API.Models.DTO
{
    public class AddTransactionDto
    {
        public int UserID { get; set; }
        public int? PaymentMethodID { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
    }
}
