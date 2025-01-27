namespace ExpenseTracker.API.Models.DTO
{
    public class UpdatePaymentMethodDto
    {
        public string UserID { get; set; }
        public string Name { get; set; }
        public string? Details { get; set; }
    }
}
