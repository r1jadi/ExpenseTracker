﻿namespace ExpenseTracker.API.Models.Domain
{
    public class Goal
    {
        public int GoalID { get; set; }
        public int UserID { get; set; }
        public decimal TargetAmount { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }

        //rel

        public User User { get; set; }
    }
}