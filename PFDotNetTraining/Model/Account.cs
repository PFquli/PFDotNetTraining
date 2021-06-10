using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PFDotNetTraining.Model
{
    public class Account
    {
        public int AccountId { get; set; }
        public string Name { get; set; }
        public string RefreshToken { get; set; }
    }
}