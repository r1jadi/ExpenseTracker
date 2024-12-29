namespace ExpenseTracker.API.Models.Domain
{
    public class Currency
    {
        public int CurrencyID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }

        //rel

        public ICollection<Expense> Expenses { get; set; }
        public ICollection<Income>  Incomes { get; set; }
        public ICollection<Subscription> Subscriptions { get; set; }
    }
}
