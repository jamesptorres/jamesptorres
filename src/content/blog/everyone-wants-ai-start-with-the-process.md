---
title: "Everyone wants AI. Start with the process."
description: "Every AI request starts the same way: \"We want an agent for ___.\" Five questions to ask first, and the three things that request usually turns out to be: no AI, a small ask, or a large one."
pubDate: 2026-11-13
tags: ["AI", "Technical"]
heroImage: ./images/everyone-wants-ai-start-with-the-process/cover.png
heroAlt: "Everyone wants AI. Start with the process. A process flow of ordinary steps with a single AI step in the middle"
draft: false
---

Every AI conversation I'm in starts the same way: "We want an agent for ___." The blank changes. The sentence doesn't.

At that point, nobody knows whether it's a quick win, a six-month project, or not an AI problem at all. That's what the first conversation is for.

**Before anyone opens a tool, I ask five questions:**

1. **What starts the process?**\
   The trigger decides where the solution plugs in, and whether it runs without anyone remembering to start it.
2. **Which part takes the most manual effort today?**\
   That's where the time savings, and the business case, come from.
3. **Where does someone make a judgment call?**\
   Judgment is the part that actually needs AI. None, with tidy inputs, usually means no AI. One usually means a small ask. Several, or one that spans systems or acts on someone's behalf, means a large one.
4. **Where does the result have to land, and who's allowed to put it there?**\
   Writing to a system of record is where the risk lives, and it decides how much approval and security the design needs.
5. **How will we know it worked?**\
   Without a baseline, you can't prove the value, and the next AI request gets harder to fund.

## Everyone wants AI

"We want an agent" is a fine starting point and a poor requirement. Guessing which kind of request you're holding is expensive in both directions. Either you spend months building an agent to do a job a rule could do, or you promise a quick win and end up with a six-month project nobody budgeted for.

That's why those five questions come first, asked with the people who actually do the work. The answers put almost every request into one of three buckets.

## No AI at all

Routing approvals over a certain amount is a workflow condition. Flagging late orders is a report and an alert. Filling in fields on a new vendor is often configuration.

If every decision in the process can be written as an if-then rule, and the inputs arrive structured, a workflow will do it faster, cheaper, and the same way every time. Saying so early isn't a letdown. It gets the problem solved this month, and it earns trust for the request that does need AI.

## A small ask

In my experience, this is the most common answer: an ordinary workflow with one judgment step in it.

Take a shared accounts payable inbox. Vendors send invoices, statements, payment questions, and the occasional "please update our bank details," all to the same address and in every format imaginable. Today, someone reads each email, works out what it is, pulls out the vendor and invoice number, and routes it.

Once you know what an email is, everything after that is mechanical. The judgment is in the reading: deciding what a messy email and its attachment actually are. That's exactly what rules are bad at. Subject lines are unreliable, and every vendor formats things differently. So that's the AI step. It returns a category and a few key fields, a workflow does the routing and creates the records, and anything the AI isn't sure about goes to a person.

Could a workflow do most of this? Mostly, yes, and that's the point. A small ask is easy to test, easy to explain, and low-risk.

Digging in also shows what not to automate. Bank-detail change requests are a favorite target for fraud, so the agent only flags them. A person verifies every one directly with the vendor.

## A large ask

Now make the same inbox request bigger: the agent should resolve invoice discrepancies on its own. It reads the vendor's email, checks the purchase order and the receipt in the ERP, decides whether the vendor is right, adjusts the invoice, and replies.

That's several judgment calls, across several systems, with the agent acting on someone's behalf. It's worth doing, but the hard questions stop being about AI. They become four architecture decisions:

**Whose identity does the agent act as?** If it acts as each user, every action carries that person's permissions and name, and with single sign-on set up properly they often only sign in or consent once. A shared service account removes that step, but everyone gets that account's access, and the audit trail shows the account instead of the person. Decide this with security at the start.

**What can it write, and who approves?** For writes that matter, like adjusting that invoice, my default is simple: the agent proposes, a person approves, and a workflow does the actual write. Low-risk, reversible actions can skip the person.

**What are the platform's limits?** Every platform caps how much data a call can return and how long it can run. The fix is architectural: filter and shape the data, page through it, or move the heavy work out of the conversation. A smarter model won't help.

**Who owns it after launch?** An agent is software, and it needs an owner, testing, and monitoring. The quietest failure I've seen was an agent that simply stopped working because a credential behind it expired, and nobody was watching.

Teams that build first usually meet these as surprises: a sign-in prompt nobody expected, calls timing out on large data, approvals bolted on at the end. Asked up front, they're just design decisions. What keeps a large ask from stalling is scoping it as what it is: an architecture project with AI in it.

## Back to the blank

So the next time someone says "we want an agent for ___," start with the process. The blank often turns out smaller than anyone expected, and sometimes it isn't AI at all.

None of that is a case against AI. It's how you get it working sooner. A well-scoped small ask can often be live in weeks, not months, and every one teaches your team what the next, bigger agent will need. Start with the process, and the AI has somewhere useful to go.

Thanks for reading,\
James
