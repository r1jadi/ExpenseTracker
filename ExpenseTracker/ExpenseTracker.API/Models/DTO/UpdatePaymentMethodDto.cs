namespace ExpenseTracker.API.Models.DTO
{
    public class UpdatePaymentMethodDto
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string? Details { get; set; }
    }
}
