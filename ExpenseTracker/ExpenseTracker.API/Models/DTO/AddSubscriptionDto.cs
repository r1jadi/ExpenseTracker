namespace ExpenseTracker.API.Models.DTO
{
    public class AddSubscriptionDto
    {
        public int UserID { get; set; }
        public int CurrencyID { get; set; }
        public string ServiceName { get; set; }
        public decimal Cost { get; set; }
        public DateTime RenewalDate { get; set; }
        public bool IsActive { get; set; }
    }
}
