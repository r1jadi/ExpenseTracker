using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class PaymentMethodDto
    {
        public int PaymentMethodID { get; set; }
        public int UserID { get; set; }
        public string Name { get; set; }
        public string? Details { get; set; }

        //relationships

        public User User { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}
