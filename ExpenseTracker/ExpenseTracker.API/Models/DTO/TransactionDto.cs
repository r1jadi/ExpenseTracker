using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class TransactionDto
    {
        public int TransactionID { get; set; }
        public int UserID { get; set; }
        public int? PaymentMethodID { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }

        //relationships

        public User User { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}
