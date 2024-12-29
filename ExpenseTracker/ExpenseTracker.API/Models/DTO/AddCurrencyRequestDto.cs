namespace ExpenseTracker.API.Models.DTO
{
    public class AddCurrencyRequestDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }
    }
}
