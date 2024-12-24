namespace ExpenseTracker.API.Models.Domain
{
    public class Transaction
    {
        public int TransactionID { get; set; }
        public int UserID { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int? PaymentMethodID { get; set; }
        public string? Description { get; set; }

        //relationships

        public User User { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

    }
}
