---
title: "Everyone wants AI. Start with the process."
description: "Teams building AI agents rarely ask about the model. Their real questions point to the same root cause, and to a simpler way to start: no AI, a small ask, or a large one."
pubDate: 2026-11-13
tags: ["AI", "Technical"]
heroImage: ./images/everyone-wants-ai-start-with-the-process/cover.png
heroAlt: "Everyone wants AI. Start with the process. A process flow of ordinary steps with a single AI step in the middle"
draft: true
---

I spend a lot of time answering questions from teams building AI agents. Recently I worked through a batch of them, sent in by organizations at every stage, and one thing stood out: almost none were about the model.

They fell into two groups. Teams that hadn't started were asking where to begin. Teams that had started had hit a wall: a sign-in prompt users couldn't get rid of, calls timing out on large data, approvals that had to happen before anything was written, and how to keep agents under control once more people were building them.

Different questions, same root cause. Nobody had a model problem. They had a process problem, and most of them found it after the build instead of before it.

**Before anyone opens a tool, I ask five questions:**

1. **What starts the process?**
2. **Where does the time actually go?**
3. **Where does someone make a judgment call?** None means it's not an AI problem. One means it's a small ask. Many means it's a large one.
4. **Where does the result have to land, and who's allowed to put it there?**
5. **How will we know it worked?**

## Everyone wants AI

Most AI work starts with a sentence like "we want an agent for collections." That's a fine starting point and a poor requirement. Until you dig into the process, you don't know whether you're holding a quick win, a real project, or something that doesn't need AI at all.

Getting that wrong is expensive in both directions. Either you spend months building an agent to do a job a rule could do, or you promise a quick win and walk straight into a security review.

That's why those five questions come first, asked with the people who actually do the work. The answers put almost every request into one of three buckets.

## No AI at all

Routing approvals over a certain amount is a workflow condition. Flagging late orders is a report and an alert. Filling in fields on a new vendor is often configuration.

If every decision in the process can be written as an if-then rule, a workflow will do it faster, cheaper, and the same way every time. Saying so early isn't a letdown. It gets the problem solved this month, and it earns trust for the request that does need AI.

## A small ask

This is the most common answer: an ordinary workflow with one judgment step in it.

Take collections emails drafted from about 30 templates. Gathering the invoice details, filling in the template, and creating the draft are all mechanical. The one real judgment is which template fits this customer's situation. That's the AI step, and a person still reviews and sends every email.

Could a workflow have done most of this? Mostly, yes, and that's the point. A small ask is easy to test, easy to explain, and low-risk. Digging in also shows what not to automate. Here, the templates are maintained by hand, because adding one takes seconds.

## A large ask

Some requests really are large. The agent has to reason across several systems, handle inputs that vary every time, or act on someone's behalf. This is where the walls from those questions live, and none of them are AI problems.

The sign-in prompt is a decision about whose identity the agent acts as. Acting as each user means a prompt, but every action carries that person's own permissions and name. A shared account removes the prompt, and gives everyone that account's access.

The timeouts are platform limits, and the fix is shaping the data before the agent sees it, not a smarter model.

The approvals come down to one rule: the agent proposes, a person approves, and a workflow does the actual write.

And someone has to own the agent after launch. The quietest failure I've seen was an agent that simply stopped working because a credential behind it expired, and nobody was watching.

Large asks are worth doing. They're architecture projects with an AI step in them, and they should be scoped like one.

## The model is the easy part

The teams asking where to start were in a better position than they thought. They hadn't built anything yet, so they could still start with the process.

Find out which bucket you're in first. The AI part usually turns out smaller, and more useful, than anyone expected.

Thanks for reading,\
James

*Next week: back to the* Do You Git It? *series with Part 2.*
