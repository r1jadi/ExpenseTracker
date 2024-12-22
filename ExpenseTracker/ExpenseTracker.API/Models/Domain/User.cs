namespace ExpenseTracker.API.Models.Domain
{
    public class User
    {
        
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string? ProfilePicture { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //relationships

        public ICollection<Expense> Expenses { get; set; }
        public ICollection<Income> Incomes { get; set; }
        public ICollection<Budget> Budgets { get; set; }
        public ICollection<Notification> Notifications { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Goal> Goals { get; set; }
        public ICollection<Subscription> Subscriptions { get; set; }
        public ICollection<RecurringExpense> RecurringExpenses { get; set; }
        public ICollection<AuditLog> AuditLogs { get; set; }
        public ICollection<Settings> Settings { get; set; }


    }
}
